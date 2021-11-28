import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, useFormState } from "react-hook-form";
import { RootState } from "../../app/store";
import { chooseWinner } from "./bettingSlice";

interface BettingWinnerFormProps {
  onCls: () => void;
}

type Inputs = {
  winner: string;
};

const BettingWinnerForm: FunctionComponent<BettingWinnerFormProps> = ({ onCls }) => {
  const dispatch = useDispatch();
  const betting = useSelector((state: RootState) => state.betting);
  const { register, handleSubmit, control } = useForm<Inputs>({ mode: "all" });
  const { isDirty, isValid } = useFormState({ control });

  const onConfirm = async (data: Inputs) => {
    dispatch(chooseWinner(betting.game.id!, data.winner));
    onCls();
  };

  const options = betting.game.options.map((item, i) => (
    <div className="row mb-3" key={item.id!.toString()}>
      <div className="col">
        <input type="radio" className="btn-check w-100" value={item.id} id={item.id} {...register("winner")} />
        <label className="btn btn-outline-info w-100" htmlFor={item.id}>
          <p>{item.description}</p>
          <p>{item.total} scales</p>
        </label>
      </div>
    </div>
  ));

  return (
    <div className="text-center">
      <h1>Choose outcome</h1>
      <p className="lead">{betting.game.objective}</p>
      <form onSubmit={handleSubmit(onConfirm)}>
        {options}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100" disabled={!isDirty || !isValid}>
            Confirm
          </button>
        </div>
        <div className="mb-3">
          <button className="btn btn-danger w-100">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default BettingWinnerForm;
