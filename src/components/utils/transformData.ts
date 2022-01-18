import { TransformedData, UsageEntries } from "../../interfaces";

export const transformData = (data: UsageEntries) => {
    return data.reduce((acc: TransformedData, value) => {
        // do not mutate function params
        const temp = acc;

        temp.push({
            carbon_g: value.data.attributes.carbon_g,
            label: value.data.attributes.estimated_at
        });

        return temp;
    }, []);
}