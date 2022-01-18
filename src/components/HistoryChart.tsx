import { Button, Grid, MenuItem, Select } from '@mui/material'
import { Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { SUPPORTED_COUNTRIES } from '../config'
import { GlobalContext } from '../contexts'
import { TransformedData } from '../interfaces'
import { filterData } from './utils/filterData'
import { transformData } from './utils/transformData'

export const HistoryChart: React.FC = () => {
    const { usageEntries } = useContext(GlobalContext);

    const [transformedData, setTransformedData] = useState<TransformedData>();

    const [countryFilter, setCountryFilter] = useState<string>();

    useEffect(() => {
        setTransformedData(
            transformData(
                filterData(usageEntries, countryFilter)
            )
        )
    }, [usageEntries, countryFilter])

    return (
        <>
            <Formik
                initialValues={{
                    countryFilter: 'US'
                }}
                onSubmit={(values) => {
                    setCountryFilter(values.countryFilter);
                }}
            >
                {({
                    values,
                    handleSubmit,
                    handleChange
                }) => (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <ResponsiveContainer width={'100%'} height={300}>
                                <BarChart data={transformedData} margin={{ top: 20, right: 50, bottom: 20, left: 50 }}>
                                    <Bar dataKey="carbon_mt" fill="#8884d8" />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis dataKey="label" />
                                    <YAxis label={{
                                        value: 'CO2 usage in megatonnes',
                                        angle: -90,
                                        position: 'insideBottomLeft'
                                    }}/>
                                    <Tooltip />
                                </BarChart>
                            </ResponsiveContainer>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Select
                                            value={values.countryFilter}
                                            onChange={handleChange}
                                            name="countryFilter"
                                            fullWidth
                                        >
                                            {SUPPORTED_COUNTRIES && SUPPORTED_COUNTRIES.map(({ API_NAME, READABLE_NAME }) => {
                                                return (
                                                    <MenuItem key={READABLE_NAME} value={API_NAME}>{READABLE_NAME}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Button
                                            variant="outlined"
                                            type="submit"
                                            fullWidth
                                        >
                                            Filter!
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                )}
            </Formik>
        </>
    )
}
