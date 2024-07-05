export const formatDate = (isoString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(isoString).toLocaleDateString(undefined, options);
};