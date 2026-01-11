<?php

namespace App\Services;

use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class JwtAuthGuard implements Guard
{
    use GuardHelpers;

    public function __construct(protected Request $request) {}

    public function user()
    {
        if (! is_null($this->user)) {
            return $this->user;
        }

        $jwt = $this->extractJwtFromRequest($this->request);
        $payload = $this->parseJwtToken($jwt);

        if (! $payload) {
            return null;
        }

        if ($this->sessionIsBlocked($payload->sid)) {
            throw new AuthenticationException('Session is blocked');
        }

        if (isset($payload->uid)) {
            $user = User::find($payload->uid);

            if ($user) {
                $this->setUser($user);

                return $user;
            }
        }

        return null;
    }

    public function validate(array $credentials = [])
    {
        return ! empty($credentials['email']) && ! empty($credentials['password']);
    }

    public function attempt(string $email = '', string $password = ''): array|bool
    {
        abort_unless($email && $password, 401);

        $user = User::where('email', $email)->first();

        if (! $user || ! Hash::check($password, $user->password)) {
            return false;
        }

        $this->setUser($user);

        return $this->createJwtTokens($user);
    }

    private function createJwtTokens($user)
    {
        $jwtSecret = config('jwt.secret');
        $jwtAlgorithm = config('jwt.algorithm');
        $accessTtl = config('jwt.access_ttl');
        $refreshTtl = config('jwt.refresh_ttl');

        $sid = uuid_create();

        $accessPayload = [
            'uid' => $user->id,
            'email' => $user->email,
            'roles' => $user->roles ?? [],
            'exp' => time() + $accessTtl,
            'sid' => $sid,
            'ttl' => 60,
        ];

        $refreshPayload = [
            'uid' => $user->id,
            'email' => $user->email,
            'roles' => $user->roles ?? [],
            'exp' => time() + $refreshTtl,
            'sid' => $sid,
            'ttl' => 1440,
        ];

        return [
            'encodedAccessToken' => JWT::encode($accessPayload, $jwtSecret, $jwtAlgorithm),
            'encodedRefreshToken' => JWT::encode($refreshPayload, $jwtSecret, $jwtAlgorithm),
            'accessTokenPayload' => $accessPayload,
            'refreshTokenPayload' => $refreshPayload,
        ];
    }

    public function extractJwtFromRequest($request): ?string
    {
        return $request->bearerToken() ?: null;
    }

    public function parseJwtToken(string $jwt)
    {
        if (! $jwt) {
            return null;
        }

        try {
            $payload = JWT::decode($jwt, new Key(config('jwt.secret'), config('jwt.algorithm')));

            // if ($this->sessionIsBlocked($payload->sid)) {
            //     throw new AuthenticationException('Session is blocked');
            // }

            return $payload;
        } catch (\Exception $e) {
            throw new AuthenticationException($e->getMessage());
        }
    }

    public function logout()
    {
        $jwt = $this->extractJwtFromRequest($this->request);

        if ($jwt) {
            $payload = $this->parseJwtToken($jwt);
            if ($payload && isset($payload->sid)) {
                $this->blockSession($payload->sid, $payload->exp);
            }
        }

        $this->forgetUser();

        return ['message' => 'logout success'];
    }

    public function refreshToken(string $refreshToken): array
    {
        Log::info('внутри refreshToken, входной токен:', ['refreshToken' => $refreshToken]);

        $payload = $this->parseJwtToken($refreshToken);

        if (! $payload) {
            throw new AuthenticationException('Invalid refresh token');
        }

        // Проверяем, заблокирована ли сессия
        if ($this->sessionIsBlocked($payload->sid)) {
            throw new AuthenticationException('Session is blocked');
        }

        // Находим пользователя
        $user = User::find($payload->uid);
        if (! $user) {
            throw new AuthenticationException('User not found');
        }

        // Создаём новые токены с новым SID
        $newTokens = $this->createJwtTokens($user);

        Log::info('внутри refreshToken новые токены созданы:', $newTokens);

        // **Блокируем старую сессию только после успешного создания токенов**
        $this->blockSession($payload->sid, $payload->exp);

        return $newTokens;
    }

    private function blockSession(string $sid, int $exp)
    {
        $ttl = $exp - time();
        if ($ttl > 0) {
            Cache::put("blacklist:session:{$sid}", true, $ttl);
        }
    }

    private function sessionIsBlocked(string $sid): bool
    {
        return (bool) Cache::get("blacklist:session:{$sid}");
    }
}
