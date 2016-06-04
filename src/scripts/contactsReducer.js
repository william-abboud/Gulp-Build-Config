const alphabetArr = 'abcdefghijklmnopqrstuvwxyz'.split('');
const mapArrToProps = (arr, defaultVal) => {
  const target = {};

  for (const letter of arr) {
    target[letter] = defaultVal;
  }

  return target;
};
const sortAlphabetically = (nameA, nameB) => {
  const lowerA = nameA.name.toLowerCase();
  const lowerB = nameB.name.toLowerCase();

  if (lowerA < lowerB) { return -1 }
  if (lowerA > lowerB) { return 1 }

  return 0;
};

const firstLetter = name => ( name.charAt(0).toLowerCase() );

const DEFAULT_STATE = mapArrToProps(alphabetArr, []);

export default function (state = DEFAULT_STATE, action) {
  const { type, name, id } = action;
  const startLetter = name ? firstLetter(name) : '';
  
  switch (type) {
    case 'ADD_CONTACT':
      const newSortedList = [...state[startLetter], { name, id } ].sort(sortAlphabetically);
      
      return Object.assign({}, state, {
        [startLetter]: newSortedList
      });
    case 'DELETE_CONTACT':
      return state;
    default:
      return state;
  }
};