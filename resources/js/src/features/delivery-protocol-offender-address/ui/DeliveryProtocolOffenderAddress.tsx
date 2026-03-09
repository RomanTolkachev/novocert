import type { FC } from "react";
import { Form2, Form2FormProvider } from "@/widgets";
import { deliveryProtocolOffenderAddressConfig } from "../config";
import { Box, Typography } from "@mui/material";

export const DeliveryProtocolOffenderAddress: FC = () => {
    const handleSubmit = (formData: Record<string, unknown>) => {
        console.log("delivery_protocol_offender_address submit:", formData);
        // TODO: интеграция с API / сохранение в состояние протокола
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Адрес правонарушителя
            </Typography>
            <Form2FormProvider config={deliveryProtocolOffenderAddressConfig} onSubmit={handleSubmit}>
                <Form2 config={deliveryProtocolOffenderAddressConfig} />
            </Form2FormProvider>
        </Box>
    );
};
