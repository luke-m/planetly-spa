import { Button, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Formik } from 'formik';
import React, { useContext } from "react";
import { API_ENDPOINT, SUPPORTED_COUNTRIES } from '../config';
import { GlobalContext } from '../contexts';
import { UsageEntries } from '../interfaces';
import AddCircle from '@mui/icons-material/AddCircle';
import { makePOST } from '../utils/makePOST';
import { makeGET } from '../utils/makeGET';
import * as Yup from 'yup';

const AddEntrySchema = Yup.object().shape({
    usage: Yup.number().positive()
})

export const AddEntry: React.FC = () => {
    const {
        setUsageEntries,
        apiKey,
        setError
    } = useContext(GlobalContext);

    return (
        <Formik
            initialValues={{
                country: 'US',
                usage: 1,
                unit: 'mwh'
            }}
            validationSchema={AddEntrySchema}
            onSubmit={async (values) => {
                try {
                    await makePOST(API_ENDPOINT, apiKey, {
                        type: "electricity",
                        electricity_unit: values.unit,
                        electricity_value: values.usage,
                        country: values.country.toLowerCase()
                    })

                    const result = await makeGET<UsageEntries>(API_ENDPOINT, apiKey);
                    setUsageEntries(result);
                } catch (e) {
                    setError((e as any).toString());
                }
            }}>
            {({ values, handleSubmit, handleChange, errors }) => (
                <Grid container mt={5}>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={5}>
                                    <FormControl fullWidth>
                                        <Select
                                            value={values.country}
                                            onChange={handleChange}
                                            name="country"
                                        >
                                            {SUPPORTED_COUNTRIES && SUPPORTED_COUNTRIES.map(({ API_NAME, READABLE_NAME }) => {
                                                return (
                                                    <MenuItem key={READABLE_NAME} value={API_NAME}>{READABLE_NAME}</MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <FormControl fullWidth >
                                        <TextField
                                            label="Electricity Usage"
                                            name="usage"
                                            type="number"
                                            value={values.usage}
                                            onChange={handleChange}
                                            error={!!errors.usage}
                                            helperText={errors.usage} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <FormControl fullWidth>
                                        <Select
                                            name="unit"
                                            value={values.unit}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="mwh">mwh</MenuItem>
                                            <MenuItem value="kwh">kwh</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        size="large"
                                        color="primary"
                                        startIcon={<AddCircle />}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            )}
        </Formik>
    )
}