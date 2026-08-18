import { findAddress } from "@/api/cep";
import { formatDateToString } from "@/helpers/date";
import { scheduleSchema, type ScheduleSchema } from "@/schemas/schedule.schema";
import useProfessionalStore from "@/store/professionalStore";
import useScheduleStore from "@/store/scheduleStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const AddEditSchedule = ({
  handleModalOpen,
  selectedDate,
}: {
  handleModalOpen: (open: boolean) => void;
  selectedDate: Date | undefined;
}) => {
  const { getPaginatedProfessionals } = useProfessionalStore();
  const { createSchedule } = useScheduleStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ScheduleSchema>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      date: formatDateToString(selectedDate),
      patient: {
        address: {
          number: "0",
        },
      },
    },
  });

  const handleCEP = async (CEP: string) => {
    const res = await findAddress(CEP);

    if (res.logradouro) setValue("patient.address.street", res.logradouro);
    if (res.bairro) setValue("patient.address.neighborhood", res.bairro);
    if (res.localidade) setValue("patient.address.city", res.localidade);
    if (res.complemento)
      setValue("patient.address.additionalInfo", res.complemento);
  };

  const onSubmit = (data: ScheduleSchema) => {
    createSchedule({
      date: selectedDate?.toString() ?? '0000/00/00',
      professional: data.professional,
      patient: data.patient,
      paymentInfo: data.paymentInfo,
    });

    setTimeout(() => {
      handleModalOpen(false)
    }, 1000);
  };

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={() => handleModalOpen(false)}
      />
      <div className="modal fade show d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Agendar para dia {formatDateToString(selectedDate)}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={() => handleModalOpen(false)}
              />
            </div>

            <div className="modal-body">
              <form
                className="d-flex flex-column gap-2 has-validation"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="d-flex flex-column gap-2">
                  <h5>Dados do paciente</h5>
                  <div className="input-group has-validation">
                    <input
                      className={`form-control ${errors.patient?.fullName ? "is-invalid" : ""}`}
                      placeholder="Nome completo"
                      id="patient-full-name"
                      {...register("patient.fullName")}
                    />
                    {errors.patient?.fullName?.message && (
                      <div className="invalid-feedback">
                        {errors.patient?.fullName.message}
                      </div>
                    )}
                  </div>
                  <div className="input-group has-validation">
                    <input
                      className={`form-control ${errors.patient?.cpf ? "is-invalid" : ""}`}
                      placeholder="CPF"
                      maxLength={11}
                      id="patient-cpf"
                      {...register("patient.cpf")}
                    />
                    {errors.patient?.cpf?.message && (
                      <div className="invalid-feedback">
                        {errors.patient?.cpf.message}
                      </div>
                    )}
                  </div>
                  <div className="input-group has-validation">
                    <input
                      className={`form-control ${errors.patient?.birthDate ? "is-invalid" : ""}`}
                      type="date"
                      id="patient-birthdate"
                      {...register("patient.birthDate")}
                    />
                    {errors.patient?.birthDate?.message && (
                      <div className="invalid-feedback">
                        {errors.patient?.birthDate.message}
                      </div>
                    )}
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <div className="input-group has-validation">
                      <input
                        className={`form-control ${errors.patient?.address?.cep ? "is-invalid" : ""}`}
                        placeholder="CEP"
                        id="patient-address-cep"
                        {...register("patient.address.cep")}
                        maxLength={8}
                        onBlur={(e) => handleCEP(e.currentTarget.value)}
                      />
                      {errors.patient?.address?.cep?.message && (
                        <div className="invalid-feedback">
                          {errors.patient?.address?.cep.message}
                        </div>
                      )}
                    </div>
                    <div className="d-flex gap-2">
                      <div className="input-group has-validation">
                        <input
                          className={`form-control flex-fill ${errors.patient?.address?.street ? "is-invalid" : ""}`}
                          placeholder="Rua"
                          id="patient-address-street"
                          {...register("patient.address.street")}
                        />
                        {errors.patient?.address?.street?.message && (
                          <div className="invalid-feedback">
                            {errors.patient?.address?.street.message}
                          </div>
                        )}
                      </div>
                      <div className="input-group has-validation">
                        <input
                          className={`form-control ${errors.patient?.address?.number ? "is-invalid" : ""}`}
                          placeholder="Número"
                          type="number"
                          id="patient-address-number"
                          {...register("patient.address.number")}
                          defaultValue={0}
                          min={0}
                        />
                        {errors.patient?.address?.number?.message && (
                          <div className="invalid-feedback">
                            {errors.patient?.address?.number.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="input-group has-validation">
                      <input
                        className={`form-control ${errors.patient?.address?.cep ? "is-invalid" : ""}`}
                        placeholder="Complemento"
                        id="patient-address-addinfo"
                        {...register("patient.address.additionalInfo")}
                      />
                      {errors.patient?.address?.cep?.message && (
                        <div className="invalid-feedback">
                          {errors.patient?.address.cep.message}
                        </div>
                      )}
                    </div>
                    <div className="d-flex gap-2">
                      <div className="input-group has-validation">
                        <input
                          className={`form-control ${errors.patient?.address?.neighborhood ? "is-invalid" : ""}`}
                          placeholder="Bairro"
                          id="patient-address-neighborhood"
                          {...register("patient.address.neighborhood")}
                        />
                        {errors.patient?.address?.neighborhood?.message && (
                          <div className="invalid-feedback">
                            {errors.patient?.address?.neighborhood.message}
                          </div>
                        )}
                      </div>
                      <div className="input-group has-validation">
                        <input
                          className={`form-control ${errors.patient?.address?.city ? "is-invalid" : ""}`}
                          placeholder="Cidade"
                          id="patient-address-city"
                          {...register("patient.address.city")}
                        />
                        {errors.patient?.address?.city?.message && (
                          <div className="invalid-feedback">
                            {errors.patient?.address.city.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="input-group has-validation">
                    <textarea
                      className={`form-control ${errors.patient?.additionalInfo ? "is-invalid" : ""}`}
                      placeholder="Queixa do paciente"
                      id="patient-add-info"
                      {...register("patient.additionalInfo")}
                    />
                    {errors.patient?.additionalInfo?.message && (
                      <div className="invalid-feedback">
                        {errors.patient?.additionalInfo.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex flex-column gap-2">
                  <h5>Dados da pessoa profissional</h5>
                  <div className="input-group has-validation">
                    <select
                      className={`form-control ${errors.professional ? "is-invalid" : ""}`}
                      aria-label="Default select example"
                      id="professional"
                      {...register("professional")}
                    >
                      <option value="" selected>
                        Selecione uma pessoa profissional
                      </option>
                      {getPaginatedProfessionals().map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.fullName} - {p.crm}{" "}
                        </option>
                      ))}
                    </select>
                    {errors.professional?.message && (
                      <div className="invalid-feedback">
                        {errors.professional.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex flex-column gap-2">
                  <h5>Dados do pagamento</h5>
                  <div className="input-group has-validation">
                    <select
                      className={`form-control ${errors.paymentInfo?.method ? "is-invalid" : ""}`}
                      aria-label="Default select example"
                      id="payment-method"
                      {...register("paymentInfo.method")}
                    >
                      <option value="" selected>
                        Escolha forma de pagamento
                      </option>
                      <option value="CREDIT-CARD">Cartão de crédito</option>
                      <option value="PIX">Pix</option>
                      <option value="MONEY">Dinheiro</option>
                    </select>
                    {errors.paymentInfo?.method?.message && (
                      <div className="invalid-feedback">
                        {errors.paymentInfo.method.message}
                      </div>
                    )}
                  </div>
                </div>
                <button className="btn btn-light" type="submit">
                  Agendar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditSchedule;
