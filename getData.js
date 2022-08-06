const DB = "../data.json";

export const getDBData = async () => {
    const res = await fetch(DB)
    const data = await res.json()

    return data
}
