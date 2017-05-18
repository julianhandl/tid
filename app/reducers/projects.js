const initialState = {
    projects: [
        {
            name: "International Private Banking"
        },
        {
            name: "Sounds of the Wachau"
        },
        {
            name: "Festspielhaus St. Pölten"
        },
        {
            name: "JPM Connect"
        }
    ]
}

export default function projects(state = initialState, action){
    switch (action.type) {
    default:
        return state
    }
}
