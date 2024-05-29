import { Pagination } from "@mui/material";

interface Props {
    count: number;
    page: number;
    onPageChange: (page: number) => void;
}

const CountryPagination = ({ count, page, onPageChange }: Props) => {
    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value);
    };

    return (
        <Pagination
            variant="outlined"
            shape="rounded"
            color="primary"
            count={count}
            page={page}
            onChange={handleChange}
        />
    );
};

export default CountryPagination;
