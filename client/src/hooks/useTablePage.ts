import useNavigateDefault from "./useNavigateDefault";

function useTablePage(pageKey: string = "subpage", redirect: string) {
    const navigate = useNavigateDefault();

    const closeAction = () => {
        const params = new URLSearchParams(location.search);
        params.delete(pageKey);

        const search = params.toString();

        navigate(search ? `${redirect}?${search}` : redirect);
    };

    return { pageKey, closeAction };
}

export default useTablePage;
