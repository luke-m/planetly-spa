import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useFormik } from 'formik';
import React, { useContext } from "react";
import { API_ENDPOINT, SUPPORTED_COUNTRIES } from '../config';
import { GlobalContext } from '../contexts';
import { UsageEntries } from '../interfaces';

export const AddEntry: React.FC = () => {
    const {
        setUsageEntries,
        apiKey
    } = useContext(GlobalContext);

    const formik = useFormik({
        initialValues: {
            country: 'US',
            usage: 1,
            unit: 'mwh'
        },
        onSubmit: (values) => {
            fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: "electricity",
                    electricity_unit: values.unit,
                    electricity_value: values.usage,
                    country: values.country.toLowerCase()
                })
            }).then((response) => {
                response.json().then((data) => {
                    fetch(API_ENDPOINT, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${apiKey}`,
                        },
                    }).then((response: { json: () => Promise<any>; }) => {
                        response.json().then((data: UsageEntries) => {
                            setUsageEntries(data);
                        })
                    })
                })
            });
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <Select
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            name="country"
                        >
                            {SUPPORTED_COUNTRIES && SUPPORTED_COUNTRIES.map(({ API_NAME, READABLE_NAME }) => {
                                return (
                                    <MenuItem key={READABLE_NAME} value={API_NAME}>{READABLE_NAME}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <TextField
                            label="Electricity Usage"
                            name="usage"
                            type="number"
                            value={formik.values.usage}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <Select
                            label="Unit of measurement"
                            name="unit"
                            value={formik.values.unit}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="mwh">mwh</MenuItem>
                            <MenuItem value="kwh">kwh</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="outlined"
                        size="large"
                        color="primary"
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}