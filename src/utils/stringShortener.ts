const stringShortener = (data: string, length = 5) => {
    return `${data.slice(0, length)}...${data.slice(data.length - length, data.length)}`;
};

export default stringShortener;
