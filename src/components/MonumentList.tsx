import { Box, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Monument } from "../types/Monument";
import { SALAMANCA_MONUMENTS_URL } from "../constants/urls";
import MonumentDetails from "./MonumentDetails";

function MonumentList() {
    const [lista, setLista] = useState<Monument[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (lista) {
            return;
        }

        fetch(SALAMANCA_MONUMENTS_URL).then((response) => {
            response.json().then((monuments: Monument[]) => {
                setLista(monuments);
                setIsLoading(false);
            });
        });
    }, [lista]);

    return (<Container>
        {isLoading && <Box p={4} m={12} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
        </Box>}
        {lista && lista.map((monument) =>
            <MonumentDetails monument={monument} key={monument.id} />)}
    </Container>);
}

export default MonumentList;