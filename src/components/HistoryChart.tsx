import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { GlobalContext } from '../contexts'

interface TransformedDataEntry {
    carbon_g: number;
    label: string;
}

type TransformedData = Array<TransformedDataEntry>

export const HistoryChart: React.FC = () => {
    const { usageEntries } = useContext(GlobalContext);

    const [transformedData, setTransformedData] = useState<TransformedData>();

    useEffect(() => {
        const transformed = usageEntries.reduce((acc: TransformedData, value) => {
            // do not mutate function params
            const temp = acc;

            temp.push({
                carbon_g: value.data.attributes.carbon_g,
                label: value.data.attributes.estimated_at
            });

            return temp;
        }, []);

        setTransformedData(transformed)
    }, [usageEntries])

    return (
        <Grid container>
            <LineChart width={600} height={300} data={transformedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="carbon_g" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </Grid>
    )
}
