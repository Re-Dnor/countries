const setLoading = () => ({
  type: 'SET_LOADING',
})

const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error,
})

const setCountry = (country) => ({
  type: 'SET_COUNTRY',
  payload: country,
})

export const clearDetails = () => ({
  type: 'CLEAR_DETAILS',
})

const setNeighbors = (countries) => ({
  type: 'SET_NEIGHBORS',
  payload: countries,
})

export const loadCountryByName = (name) => (dispatch, _, { api, client }) => {
  dispatch(setLoading());

  client.get(api.searchByCountry(name))
    .then(({ data }) => dispatch(setCountry(data[0])))
    .catch((error) => dispatch(setError(error)))
}

export const loadNeighbors = (borders) => (dispatch, _, { client, api }) => {
  client.get(api.filterByCode(borders))
    .then(({ data }) => dispatch(setNeighbors(data.map((c) => c.name))))
    .catch((console.error));
}