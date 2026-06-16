import type { IAttack } from "../../interfaces/attack.interface";
import "./AttackList.scss";

interface AttackListProps {
  attacks: IAttack[];
}

export function AttackList({ attacks }: AttackListProps) {
  return (
    <ul className="wrs-list">
      {attacks.map((attack) => (
        <li className="wrs-list-item" key={`${attack.name}-${attack.points}`}>
          <p>{attack.name}</p>
          <p>
            Tipo:{" "}
            <span className="wrs-list-item__type">
              {attack.types.join(" ")}
            </span>
          </p>
          <p>Puntos: {attack.points}</p>
        </li>
      ))}
    </ul>
  );
}
