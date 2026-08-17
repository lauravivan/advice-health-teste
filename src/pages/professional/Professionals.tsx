import professionals from "@/db/professionals.json";
import useProfessionalStore from "@/store/professionalStore";

const Professionals = () => {
  const { setProfessional, professional } = useProfessionalStore();

  return (
    <div className="d-flex flex-column w-100 h-100">
      <h2 className="">Profissionais disponíveis: </h2>
      <p>Selecione um profissional para acessar sua agenda</p>

      <ul className="list-group">
        {professionals.map((p) => (
          <li
            key={p.id}
            onClick={() => setProfessional(p.id)}
            className={`list-group-item list-group-item-action${professional?.id === p.id ? ' active' : ''}`}
          >
            {p.name} - {p.crm}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Professionals;
