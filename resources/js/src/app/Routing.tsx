import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { OnlyAuth, OnlyUnAuth, RoleGuard } from "./AuthProvider";
import { Certs, Companies, Feedbacks, LoginPage, Organs, PersonalPage, SaPersonalPage, Systems, Users } from "@/pages";
import { Bio } from "@/widgets";


export const Routing: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<>главная</>} />
            <Route
                path="/personal/*"
                element={
                    <OnlyAuth >
                        <RoleGuard
                            forRoles={['sa']}
                            giveComponent={<SaPersonalPage />}
                            defaultComponent={<PersonalPage />}
                        />
                    </OnlyAuth>}>
                <Route path="" element={<Bio />} />
                <Route path="users" element={<Users />}></Route>
                <Route path="companies" element={<Companies />}></Route>
                <Route path="systems" element={<Systems />}></Route>
                <Route path="organs" element={<Organs />}></Route>
                <Route path="certs" element={<Certs />}></Route>
                <Route path="feedbacks" element={<Feedbacks />}></Route>
            </Route>
            <Route path="/login" element={<OnlyUnAuth><LoginPage /></OnlyUnAuth>} />
        </Routes>
    )
}