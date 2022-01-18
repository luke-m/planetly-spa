import { Grid, TextField } from "@mui/material"
import { useFormik } from "formik";
import { useContext } from "react";
import { GlobalContext } from "../contexts";


export const ApiKeyPrompt: React.FC = () => {
    const { setApiKey } = useContext(GlobalContext);
    const formik = useFormik({
        initialValues: {
            apiKey: ''
        },
        onSubmit: (values) => {
            setApiKey(values.apiKey);
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid item xs={12} md={12}>
                <TextField
                    label="Carbon Interface API key"
                    value={formik.values.apiKey}
                    name="apiKey"
                    onChange={formik.handleChange}
                />
            </Grid>
        </form>
    )
}