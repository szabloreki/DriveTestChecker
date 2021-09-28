import { Component } from '@angular/core';
import { from, Observable, of, pipe } from 'rxjs';
import { map, } from 'rxjs/operators'

function MyOf(...variables: any[]) {
  return new Observable((subcriber) => {
    variables.forEach(x => {
      subcriber.next(x)
    })
  })
}

function MyMap(operatorFunc: Function) {
  return function (observable: Observable<any>) {
    return new Observable((subscriber) => {
      return observable.subscribe(
        (next: any) => {
          subscriber.next(operatorFunc(next))
        },
      )
    })
  }
}

// function PipeOperator(
//   ...functs: Function[]
// ) {
// }

function Pipe(...functs: any[]) {
  return function (value: any) {
    return functs.reduce((a, b) => {
      return b(a)
    }, value)
  }
}

function MyInterval(ms: number) {
  return new Observable((subcriber) => {
    console.log('interval');
    const intervalRef = setInterval(() => {
      subcriber.next(500)
      console.log('IS NEXT');
    }, ms)
    return () => {
      console.log('GWAREK');
      clearInterval(intervalRef)
    }
  })
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'drive-test-checker';

  constructor() {
  }

  ngOnInit() {

    const chainedOperators = Pipe(MyMap((x: number) => x * 2)
      , map((x: number) => x + 2))

      chainedOperators(MyInterval(500)).subscribe( (x: any) => {
        console.log(x, 'xxxx');
      })

    // const nums = MyOf(1, 2, 3)
    // const as$ = MyMap((x: number) => x * 2)
    // // MyInterval(1000).subscribe(x => { console.log(x, 'n')})
    // as$(MyInterval(1000)).subscribe(x => { console.log(x, 'n') })
    // const squareValuesMultiple = map((val: number) => val * 2)
    // const squareValuesMultiple$ = squareValuesMultiple(squaredNums)
    // squareValuesMultiple$.subscribe(x => console.log(x));
  }

}


