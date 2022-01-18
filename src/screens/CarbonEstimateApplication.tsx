import { Grid } from '@mui/material';
import React from "react";
import { AddEntry } from '../components/AddEntry';
import { HistoryChart } from '../components/HistoryChart';

interface CarbonEstimateApplicationProps {
    apiKey: string;
}

export const CarbonEstimateApplication: React.FC<CarbonEstimateApplicationProps> = () => {
    return (
        <Grid container spacing={2}>
            <AddEntry />
            <HistoryChart />
        </Grid>
    )
}