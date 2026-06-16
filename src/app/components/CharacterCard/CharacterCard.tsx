import type { ICharacter } from "../../interfaces/character.interface";
import { AttackList } from "../AttackList/AttackList";
import { Button } from "../Button/Button";
import cardBackground from "../../../../assets/images/backgrounds/damask-seamless-pattern-background/821.jpg";
import "./CharacterCard.scss";

interface CharacterCardProps {
  character: ICharacter;
  onTrain: () => void;
  onConvert: () => void;
}

export function CharacterCard({
  character,
  onTrain,
  onConvert,
}: CharacterCardProps) {
  const canConvert = character.level === 3;

  return (
    <section className="col-12" id="warriorSection">
      <article
        className="medieval-card"
        style={{ backgroundImage: `url(${cardBackground})` }}
      >
        <section className="medieval-card__template-content">
          <p className="medieval-card__title"> Nombre: {character.name}</p>
          <p className="medieval-card__paragraph medieval-card__paragraph--small">
            Tipo: {character.type}
          </p>
          <p className="medieval-card__paragraph medieval-card__paragraph--small medieval-card__paragraph--align-end">
            Nivel: {character.level}
          </p>
        </section>
        <div className="medieval-card__picture">
          <img
            alt={character.name}
            className="medieval-card__image"
            src={character.image}
          />
        </div>
        <section className="medieval-card__attacks">
          <p className="medieval-card__title">Ataques:</p>
          <AttackList attacks={character.attacks} />
        </section>
        <section className="medieval-card__footer">
          <Button color="yellow" onClick={onTrain}>
            Entrenar
          </Button>
          {canConvert ? (
            <Button color="red" onClick={onConvert}>
              Convertirse
            </Button>
          ) : null}
        </section>
      </article>
    </section>
  );
}
