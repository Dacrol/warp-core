export default class Component extends ReactComponent {

  // Create a global store (or read it from localStorage)
  @observable static store = (()=>{
    let s = {};
    try { s = JSON.parse(localStorage.store); } catch(e){}
    return s;
  })();

  // A shared space for cross component sharing
  @observable static shared = {};

  constructor(props){
    super(props);
    
    // Create a key in the global store for each class
    let cname = this.constructor.name;
    Component.store[cname] = Component.store[cname] || {};
    
    // Let all the global store be reachable as this.stores
    // and specific store as this.store
    this.stores = Component.store;
    this.store = Component.store[cname];
    
    // Share this.shared too
    this.shared = Component.shared;
    
    // React to changes in the store and save to localStorage
    Component.saveDisposer = Component.saveDisposer || reaction(
      () => toJS(Component.store),
      () => {
        localStorage.store = JSON.stringify(toJS(Component.store));
      },
    );

    // If a method named start exists then call it
    // (more convinient than having to write a constructor in the class)
    typeof this.start === 'function' && this.start();
  }

}