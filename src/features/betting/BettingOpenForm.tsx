import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useForm, useFormState, useFieldArray } from "react-hook-form";
import { BettingGame, BettingGameOption } from "./types";
import { openBetting } from "./bettingSlice";
import { ErrorMessage } from "@hookform/error-message";

interface BettingOpenFormProps {
  onCls: () => void;
}

type Inputs = {
  objective: string;
  option: { description: string }[];
};

const BettingOpenForm: FunctionComponent<BettingOpenFormProps> = ({ onCls }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
    defaultValues: { objective: "", option: [{ description: "" }, { description: "" }] },
  });
  const { fields, append, remove } = useFieldArray({ name: "option", control });
  const { isDirty, isValid } = useFormState({ control });

  const onSubmit = async (data: Inputs) => {
    const valueToSubmit: BettingGame = {
      objective: data.objective,
      options: data.option.map((item) => {
        return { description: item.description } as BettingGameOption;
      }),
    };
    dispatch(openBetting(valueToSubmit, setError));
    onCls();
  };

  return (
    <div>
      <h1>Edit Betting</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <ErrorMessage errors={errors} name="server" />
        </div>
        <div className="mb-3">
          <label htmlFor="objective" className="form-label">
            Betting Challenge/Question
          </label>
          <textarea
            className="form-control"
            id="objective"
            {...register("objective", { required: true })}
            placeholder="Will Catmando become a dog without dying?"
          />
          <ErrorMessage errors={errors} name="objective" />
        </div>
        <div className="mb-3">
          <label className="form-label">Options</label>
        </div>
        {fields.map((field, index: number) => (
          <div key={field.id} className="input-group mb-3">
            <input
              className="form-control"
              {...register(`option.${index}.description` as const, { required: index < 2 })}
            />
            {index > 0 && index < fields.length - 1 ? (
              <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                -
              </button>
            ) : (
              ""
            )}
            {index === fields.length - 1 ? (
              <button type="button" className="btn btn-info" onClick={() => append({ description: "" })}>
                +
              </button>
            ) : (
              ""
            )}
          </div>
        ))}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100" disabled={!isDirty || !isValid}>
            Open betting
          </button>
        </div>
        <div className="mb-3">
          <button type="button" className="btn btn-danger w-100" onClick={() => onCls()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

BettingOpenForm.displayName = "Betting open form";
export default BettingOpenForm;
