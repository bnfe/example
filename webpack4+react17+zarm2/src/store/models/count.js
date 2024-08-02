export default {
  state: {
    num: 0,
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    updateState(state, payload) {
      return Object.assign({}, state, payload);
    },
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async handleCount(payload, rootState) {
      let {
        count: { num },
      } = rootState;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.updateState({ num: num + payload });
    },
  },
};
