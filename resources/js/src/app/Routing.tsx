import { Route, Routes } from "react-router-dom";
import { OnlyAuth, RoleGuard } from "./AuthProvider";
import { Certs, CertSystemsPage, CertsPage, Companies, DocsPage, Feedbacks, Organs, OrgansPage, PersonalPage, SaPersonalPage, Systems, Users } from "@/pages";
import { LayoutWithOutlet } from "@/pages/layouts";
import {
    CompaniesPage,
    HomePage,
} from "@/pages/public";
import { DetailedInfo } from "@/widgets";
import { Bio } from "@/widgets";

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="cert_systems" element={<LayoutWithOutlet />}>
                <Route path="" element={<CertSystemsPage />} />
                <Route path=":id" element={<DetailedInfo sectionLabel="Системы сертификации" />} />
            </Route>
            <Route path="organs" element={<LayoutWithOutlet />}>
                <Route path="" element={<OrgansPage />} />
                <Route path=":id" element={<DetailedInfo sectionLabel="Органы по сертификации" />} />
            </Route>
            <Route path="certs" element={<LayoutWithOutlet />}>
                <Route path="" element={<CertsPage />} />
                <Route path=":id" element={<DetailedInfo sectionLabel="Сертификаты" />} />
            </Route>
            <Route path="docs" element={<LayoutWithOutlet />}>
                <Route path="" element={<DocsPage />} />
                <Route path=":id" element={<DetailedInfo sectionLabel="Документы" />} />
            </Route>
            <Route path="companies" element={<LayoutWithOutlet />}>
                <Route path="" element={<CompaniesPage />} />
                <Route path=":id" element={<DetailedInfo sectionLabel="Компании" />} />
            </Route>
            <Route path="dictionaries" element={<LayoutWithOutlet />}>
                <Route path="" element={<>справочники</>} />
                <Route path=":id" element={<DetailedInfo sectionLabel="Справочники" />} />
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
                    <Route path=":id" element={<DetailedInfo sectionLabel="Пользователи" />} />
                </Route>
                <Route path="companies" element={<LayoutWithOutlet />}>
                    <Route path="" element={<Companies />} />
                    <Route path=":id" element={<DetailedInfo sectionLabel="Компании" />} />
                </Route>
                <Route path="systems" element={<LayoutWithOutlet />}>
                    <Route path="" element={<Systems />} />
                    <Route path=":id" element={<DetailedInfo sectionLabel="Системы СДС" />} />
                </Route>
                <Route path="organs" element={<LayoutWithOutlet />}>
                    <Route path="" element={<Organs />} />
                    <Route path=":id" element={<DetailedInfo sectionLabel="Органы СДС" />} />
                </Route>
                <Route path="certs" element={<LayoutWithOutlet />}>
                    <Route path="" element={<Certs />} />
                    <Route path=":id" element={<DetailedInfo sectionLabel="Сертификаты СДС" />} />
                </Route>
                <Route path="feedbacks" element={<LayoutWithOutlet />}>
                    <Route path="" element={<Feedbacks />} />
                    <Route path=":id" element={<DetailedInfo sectionLabel="Отзывы компаний" />} />
                </Route>
            </Route>

        </Routes>
    )
}