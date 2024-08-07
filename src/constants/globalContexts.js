//store reference of react useNavigation
let navigate;
export const setNavigate = (nav) => {
  navigate = nav;
};

export const getNavigate = () => {
  if (!navigate) {
    throw new Error('Navigate function has not been set.');
  }
  return navigate;
};
