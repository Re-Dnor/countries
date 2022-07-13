export const setCountries = (countries) => ({
  type: 'SET_COUNTRIES',
  payload: countries,
})

export const setLoading = () => ({
  type: 'SET_LOADING',
})

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error,
})

export const loadCountries = () => (dispatch, _, { client, api }) => {
  dispatch(setLoading())

  client.get(api.ALL_COUNTRIES)
    .then(({ data }) => dispatch(setCountries(data)))
    .catch((error) => dispatch(setError(error.message)))
}