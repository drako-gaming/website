import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const BettingAdmin: FunctionComponent = () => {
    const bettingGame = useSelector((state: RootState) => state.betting);

    return <div>Betting game admin</div>;
};

BettingAdmin.displayName = "Betting admin";
export default BettingAdmin;
