import { Observable, OperatorFunction } from 'rxjs';
import { useState, useEffect } from 'react';

const useObservableStream = <T, U>(observable: Observable<T>, pipe?: OperatorFunction<T, U>) => {
    const [data, setData] = useState<U extends {} ? U : T>();

    useEffect(() => {
        const obs: Observable<any> = pipe ? observable.pipe(pipe) : observable;
        const sub = obs.subscribe(setData);

        return () => sub.unsubscribe();
    }, [observable]);

    return data;
}

export {
    useObservableStream
};