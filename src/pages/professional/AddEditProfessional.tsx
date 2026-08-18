import navigation from "@/navigation";
import useProfessionalStore from "@/store/professionalStore";
import { useNavigate } from "react-router";
import DoctorsImg from "@/assets/undraw_doctors_djoj.svg";

const AddEditProfessional = () => {
  const { createProfessional } = useProfessionalStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const fullName = formData.get("full-name") as string;
    const crm = formData.get("crm") as string;
    const specialty = formData.get("specialty") as string;

    createProfessional({
      name: fullName,
      crm,
      specialty,
    });

    setTimeout(() => {
      navigate(navigation.navigateToProfessionals.home());
    }, 1000);
  };

  return (
    <div className="d-flex flex-column w-100 h-100">
      <h2 className="text-center mt-3">Cadastrar profissional</h2>
      <div className="d-flex w-100 h-100">
        <div className="flex-fill w-75 m-auto bg-light rounded p-3">
          <p className="fst-italic">Preencha as informações da pessoa profissional</p>
          <form
            onSubmit={handleSubmit}
            className="mt-3 d-flex flex-column gap-3 flex-fill"
          >
            <input
              name="full-name"
              id="full-name"
              className="form-control"
              placeholder="Nome completo"
            />
            <div className="d-flex gap-3">
              <input
                name="crm"
                id="crm"
                className="form-control"
                placeholder="CRM"
              />
              <input
                name="specialty"
                id="specialty"
                className="form-control"
                placeholder="Especialidade"
              />
            </div>
            <button type="submit" className="me-auto btn btn-primary">
              Cadastrar
            </button>
          </form>
        </div>
        <div className="h-auto flex-fill ms-auto d-flex align-items-end justify-content-end">
          <img className="img-fluid object-fit-contain" src={DoctorsImg} />
        </div>
      </div>
    </div>
  );
};

export default AddEditProfessional;
