export const addDOMEventListener = (event: string, selector: string, callback: Function) => {
  document.addEventListener(event, function(ev){
    let target: HTMLElement | null = ev.target as HTMLElement;

    while (target && !target.matches(selector)) {
      target = target.parentElement;
    }

    if(target){
      callback(ev, target)
    }
  });
}