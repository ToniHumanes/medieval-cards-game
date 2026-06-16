import { Button } from "../Button/Button";
import "./CompletionBanner.scss";

interface CompletionBannerProps {
  isActive: boolean;
  onReset: () => void;
}

export function CompletionBanner({ isActive, onReset }: CompletionBannerProps) {
  return (
    <article
      className={`banner-animation ${
        isActive ? "banner-animation--active" : ""
      }`.trim()}
    >
      <span className="banner-animation__icon">🎉</span>
      <h1 className="banner-animation__title">¡¡Enhorabuena!!</h1>
      <p className="banner-animation__text">
        Has superado el juego, ahora tu gerrer@ esta en el más alto nivel,
        puedes volver a empezar el juego con otro tipo de guerrero
      </p>
      <Button color="yellow" onClick={onReset}>
        Volver a empezar
      </Button>
    </article>
  );
}
