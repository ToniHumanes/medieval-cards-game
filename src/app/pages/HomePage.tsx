import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CharacterCard } from "../components/CharacterCard/CharacterCard";
import { CompletionBanner } from "../components/CompletionBanner/CompletionBanner";
import { SelectField } from "../components/SelectField/SelectField";
import { TextField } from "../components/TextField/TextField";
import type { ICharacter } from "../interfaces/character.interface";
import { Boss } from "../models/boss.model";
import { Captain } from "../models/captain.model";
import { Character } from "../models/character.model";
import { EvilWarrior } from "../models/evil-warrior.model";
import { Recruit } from "../models/recruit.model";
import { Soldier } from "../models/soldier.model";
import {
  characterFormSchema,
  type CharacterFormInput,
  type CharacterFormValues,
  warriorOptions,
} from "../validation/characterFormSchema";
import { Button } from "../components/Button/Button";
import "./HomePage.scss";

const defaultFormValues: CharacterFormInput = {
  inputValue: "",
  selectValue: "0",
};

const levelMappings = {
  1: Recruit,
  2: Soldier,
  3: Captain,
  4: Boss,
};

export function HomePage() {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [formValues, setFormValues] = useState<CharacterFormValues | null>(
    null
  );
  const [levelStep, setLevelStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CharacterFormInput, unknown, CharacterFormValues>({
    resolver: zodResolver(characterFormSchema),
    defaultValues: defaultFormValues,
  });

  const handleCreateCharacter = (data: CharacterFormValues) => {
    setFormValues(data);
    setLevelStep(0);
    setIsComplete(false);
    setCharacter(
      new Character({ name: data.inputValue, type: data.selectValue })
    );
    reset(defaultFormValues);
  };

  const handleTrain = () => {
    if (!formValues) {
      return;
    }

    const nextStep = levelStep + 1;
    const CharacterClass = levelMappings[nextStep];

    if (CharacterClass) {
      setCharacter(
        new CharacterClass({
          name: formValues.inputValue,
          type: formValues.selectValue,
        })
      );
    }

    if (nextStep > 4) {
      setIsComplete(true);
    }

    setLevelStep(nextStep);
  };

  const handleConvert = () => {
    if (!formValues) {
      return;
    }

    setCharacter(new EvilWarrior({ name: formValues.inputValue }));
    setLevelStep(4);
  };

  const handleReset = () => {
    setCharacter(null);
    setFormValues(null);
    setLevelStep(0);
    setIsComplete(false);
    reset(defaultFormValues);
  };

  return (
    <>
      {!character ? (
        <form className="form" onSubmit={handleSubmit(handleCreateCharacter)}>
          <section className="row">
            <div className="col-12 u-margin-bottom-20px">
              <h1 className="u-margin-bottom-20px">
                Bienvenido al increible juego de Entrena a tu propio Guerrero.
              </h1>
              <p className="u-font-family--noto u-margin-bottom-10px">
                En este juego podrás elegir el tipo de personaje que deseas
                entrenar e incluso ponerle nombre.
              </p>
              <p className="u-font-family--noto u-margin-bottom-10px">
                Podrás subir de nivel haciendo click varias veces en el botón
                "Entrenar", repite el proceso hasta llegar al último nivel.
              </p>
              <p className="u-font-family--noto">
                Sigue los pasos y dale al botón "crear" para empezar, tu Heroe
                te espera.
              </p>
            </div>
            <div className="form__content">
              <TextField
                id="characterInput"
                labelText="Nombre del personaje"
                placeholder="Escribe aquí..."
                type="text"
                error={errors.inputValue?.message}
                {...register("inputValue")}
              />
              <SelectField
                id="characterselect"
                labelText="Tipo del personaje"
                optionDefaultText="selecciona"
                options={[...warriorOptions]}
                error={errors.selectValue?.message}
                {...register("selectValue")}
              />
              <div className="form__actions u-flex u-flex-justify--end u-flex-align--self--center">
                <Button color="yellow" type="submit">
                  crear ⚔️
                </Button>
              </div>
            </div>
          </section>
        </form>
      ) : (
        <div className="row">
          <CharacterCard
            character={character}
            onConvert={handleConvert}
            onTrain={handleTrain}
          />
        </div>
      )}
      <CompletionBanner isActive={isComplete} onReset={handleReset} />
    </>
  );
}
