import { Skeleton } from "@mui/material";
import { ITEMS_PER_PAGE } from "../constants";

const SkeletonCountry = () => {
    return Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <Skeleton
            key={index}
            variant="rectangular"
            width={"345px"}
            height={"100%"}
        />
    ));
};

export default SkeletonCountry;
