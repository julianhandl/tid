const initialState = {
    clients: [
        {
            name: "JP Morgan Chase"
        },
        {
            name: "Karl Wepper"
        },
        {
            name: "K-lab"
        },
    ]
}

export default function clients(state = initialState, action){
    switch (action.type) {
    default:
        return state
    }
}
