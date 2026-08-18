import AddIcon from "@/components/icons/Add";
import CloseIcon from "@/components/icons/Close";
import navigation from "@/navigation";
import useProfessionalStore from "@/store/professionalStore";
import type { Professional } from "@/types/Professional";
import { useState } from "react";
import { Link } from "react-router";

const Professionals = () => {
  const { getPaginatedProfessionals } = useProfessionalStore();
  const [openAside, setOpenAside] = useState(false);
  const [professional, setProfessional] = useState<Professional>();

  return (
    <div className="d-flex w-100 h-100 gap-3">
      <div className="w-100 d-flex flex-column h-100 p-1">
        <div className="d-flex w-100 align-items-center justify-content-between gap-3 mb-4">
          <h2 className="">Profissionais</h2>
          <form className="" style={{ width: "40%" }}>
            <input className="form-control" placeholder="Buscar profissional" />
          </form>
          <Link
            className="btn btn-light"
            title="Cadastrar profissional"
            aria-label="Navegar até cadastro de profissional"
            to={navigation.navigateToProfessionals.register()}
          >
            <AddIcon />
          </Link>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">CRM</th>
              <th scope="col">Especialidade</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedProfessionals().map((p) => (
              <tr
                onClick={() => {
                  setOpenAside(true);
                  setProfessional(p);
                }}
                key={p.id}
              >
                <th scope="row" className="fw-light">
                  {p.fullName}
                </th>
                <th scope="row" className="fw-light">
                  {p.crm}
                </th>
                <th scope="row" className="fw-light">
                  {p.specialty}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openAside && professional && (
        <div className="border-start p-1 position-relative">
          <div className="me-5">
            <h3>{professional.fullName}</h3>
            <p>CRM: {professional.crm}</p>
            <p>Especialidade: {professional.specialty}</p>
          </div>
          <button
            onClick={() => setOpenAside(false)}
            type="button"
            className="btn position-absolute top-0 end-0 mb-auto gap-3"
          >
            <CloseIcon width={25} height={25} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Professionals;
