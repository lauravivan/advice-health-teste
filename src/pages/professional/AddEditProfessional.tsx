import navigation from "@/navigation";
import useProfessionalStore from "@/store/professionalStore";
import { useNavigate } from "react-router";
import DoctorsImg from "@/assets/undraw_doctors_djoj.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { professionalSchema, type ProfessionalSchema } from "@/schemas/professional.schema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createPortal } from "react-dom";

const AddEditProfessional = ({ editMode = false }: { editMode?: boolean }) => {
  const { createProfessional } = useProfessionalStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfessionalSchema>({
    resolver: zodResolver(professionalSchema),
  });
  const [showAlert, setShowAlert] = useState(false);

  const onSubmit = (data: ProfessionalSchema) => {
    createProfessional({
      fullName: data.fullName,
      crm: data.crm,
      specialty: data.specialty,
    });

    setShowAlert(true);

    setTimeout(() => {
      navigate(navigation.navigateToProfessionals.home());
    }, 1500);
  };

  return (
    <>
      <div className="d-flex flex-column w-100 h-100">
        <h2 className="text-center mt-3">
          {editMode ? "Editar" : "Cadastrar"} profissional
        </h2>
        <div className="d-flex w-100 h-100">
          <div className="flex-fill w-75 m-auto bg-light rounded p-3">
            <p className="fst-italic">
              Preencha as informações da pessoa profissional
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-3 d-flex flex-column gap-3 flex-fill needs-validation"
            >
              <div className="input-group has-validation">
                <input
                  id="fullName"
                  className={`form-control ${
                    errors.fullName ? "is-invalid" : ""
                  }`}
                  placeholder="Nome completo"
                  {...register("fullName")}
                />
                {errors.fullName?.message && (
                  <div className="invalid-feedback">
                    {errors.fullName.message}
                  </div>
                )}
              </div>

              <div className="d-flex gap-3">
                <div className="input-group has-validation">
                  <input
                    id="crm"
                    className={`form-control ${errors.crm ? "is-invalid" : ""}`}
                    placeholder="CRM"
                    {...register("crm")}
                  />
                  {errors.crm?.message && (
                    <div className="invalid-feedback">{errors.crm.message}</div>
                  )}
                </div>
                <div className="input-group has-validation">
                  <input
                    id="specialty"
                    className={`form-control ${
                      errors.specialty ? "is-invalid" : ""
                    }`}
                    placeholder="Especialidade"
                    {...register("specialty")}
                  />
                  {errors.specialty?.message && (
                    <div className="invalid-feedback">
                      {errors.specialty.message}
                    </div>
                  )}
                </div>
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
      {showAlert && createPortal(
        <div className="position-absolute bottom-0 end-0 m-2 alert alert-success" role="alert">
          Profissional cadastrado com sucesso!
        </div>,
        document.getElementById("root")!,
      )}
    </>
  );
};

export default AddEditProfessional;
