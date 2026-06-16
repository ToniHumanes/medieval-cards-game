import "./AboutPage.scss";

export function AboutPage() {
  return (
    <section className="about-page row">
      <div className="col-12 u-margin-bottom-20px">
        <h1 className="u-margin-bottom-10px">Sobre mi</h1>
        <p className="u-font-family--noto u-margin-bottom-10px">Hola!😁</p>
        <p className="u-font-family--noto u-margin-bottom-10px">
          Soy Antonio Humanes, desarrollador Frontend y apasionado de la
          tecnología y de la experiencia de usuario.
        </p>
        <p className="u-font-family--noto u-margin-bottom-10px">
          Podemos hablar por aquí:
        </p>
        <p className="u-font-family--noto">
          <a href="mailto:antoniohumanespacheco@gmail.com">
            antoniohumanespacheco@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
