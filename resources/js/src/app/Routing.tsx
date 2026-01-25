import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { OnlyAuth, RoleGuard } from "./AuthProvider";
import { Certs, CertSystemsPage, CertsPage, Companies, DocsPage, Feedbacks, Organs, OrgansPage, PersonalPage, SaPersonalPage, Systems, Users } from "@/pages";
import { CompaniesPage } from "@/pages/public";
import { Bio } from "@/widgets";


export const Routing: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<>главная</>} />
            <Route path="cert_systems" element={<CertSystemsPage />} />
            <Route path="organs" element={<OrgansPage />} />
            <Route path="certs" element={<CertsPage />} />
            <Route path="docs" element={<DocsPage />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="dictionaries" element={<>справочники</>} />
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
            
        </Routes>
    )
}