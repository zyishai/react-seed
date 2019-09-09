import { Observable } from 'rxjs';
import { useState, useEffect } from 'react';

const useObservableStream = <T>(observable: Observable<T>) => {
    const [data, setData] = useState<T>();

    useEffect(() => {
        const sub = observable.subscribe(setData);

        return () => sub.unsubscribe();
    }, [observable]);

    return data;
}

export {
    useObservableStream
};