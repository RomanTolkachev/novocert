import { Route, Routes } from "react-router-dom";
import { OnlyAuth, RoleGuard } from "./AuthProvider";
import { Certs, CertSystemsPage, CertsPage, Companies, DocsPage, Feedbacks, Organs, OrgansPage, PersonalPage, SaPersonalPage, Systems, Users } from "@/pages";
import { LayoutWithOutlet } from "@/pages/layouts";
import {
    CompaniesPage,
    HomePage,
} from "@/pages/public";
import type { FC } from "react";
import { Typography } from "@mui/material";
import { Bio } from "@/widgets";
import { Preloader, useDetailedData, type DetailScope } from "@/shared";

type DetailStubProps = {
    scope: DetailScope;
    entity_type: string;
};

const DetailStub: FC<DetailStubProps> = ({ scope, entity_type }) => {
    const { data, isFetching, error } = useDetailedData(scope, entity_type);

    if (isFetching) {
        return <Preloader />;
    }
    if (error) {
        return (
            <Typography variant="body1" color="error">
                Ошибка загрузки
            </Typography>
        );
    }
    const payload = data?.data;
    return (
        <Typography variant="body1" color="text.secondary">
            Детальная страница — заглушка{payload !== undefined && " (данные загружены)"}
        </Typography>
    );
};

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="cert_systems" element={<LayoutWithOutlet />}>
                <Route path="" element={<CertSystemsPage />} />
                <Route path=":id" element={<DetailStub entity_type="system" scope="public" />} />
            </Route>
            <Route path="organs" element={<LayoutWithOutlet />}>
                <Route path="" element={<OrgansPage />} />
                <Route path=":id" element={<DetailStub entity_type="organ" scope="public" />} />
            </Route>
            <Route path="certs" element={<LayoutWithOutlet />}>
                <Route path="" element={<CertsPage />} />
                <Route path=":id" element={<DetailStub entity_type="cert" scope="public" />} />
            </Route>
            <Route path="docs" element={<LayoutWithOutlet />}>
                <Route path="" element={<DocsPage />} />
                <Route path=":id" element={<DetailStub entity_type="doc" scope="public" />} />
            </Route>
            <Route path="companies" element={<LayoutWithOutlet />}>
                <Route path="" element={<CompaniesPage />} />
                <Route path=":id" element={<DetailStub entity_type="company" scope="public" />} />
            </Route>
            <Route path="dictionaries" element={<LayoutWithOutlet />}>
                <Route path="" element={<>справочники</>} />
                <Route path=":id" element={<DetailStub entity_type="dictionary" scope="public" />} />
            </Route>
            <Route
                path="/personal/*"
                element={
                    <OnlyAuth>
                        <RoleGuard
                            forRoles={['sa']}
                            giveComponent={<SaPersonalPage />}
                            defaultComponent={<PersonalPage />}
                        />
                    </OnlyAuth>
                }>
                <Route path="" element={<Bio />} />
                <Route path="users" element={<LayoutWithOutlet />}>
                    <Route path="" element={<Users />} />
                    <Route path=":id" element={<DetailStub entity_type="user" scope="admin" />} />
                </Route>
                <Route path="companies" element={<LayoutWithOutlet />}>
                    <Route path="" element={<Companies />} />
                    <Route path=":id" element={<DetailStub entity_type="company" scope="admin" />} />
                </Route>
                <Route path="systems" element={<LayoutWithOutlet />}>
                    <Route path="" element={<Systems />} />
                    <Route path=":id" element={<DetailStub entity_type="system" scope="admin" />} />
                </Route>
                <Route path="organs" element={<LayoutWithOutlet />}>
                    <Route path="" element={<Organs />} />
                    <Route path=":id" element={<DetailStub entity_type="organ" scope="admin" />} />
                </Route>
                <Route path="certs" element={<LayoutWithOutlet />}>
                    <Route path="" element={<Certs />} />
                    <Route path=":id" element={<DetailStub entity_type="cert" scope="admin" />} />
                </Route>
                <Route path="feedbacks" element={<LayoutWithOutlet />}>
                    <Route path="" element={<Feedbacks />} />
                    <Route path=":id" element={<DetailStub entity_type="feedback" scope="admin" />} />
                </Route>
            </Route>

        </Routes>
    )
}