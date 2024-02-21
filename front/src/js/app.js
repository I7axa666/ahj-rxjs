import {
  Observable,
  interval,
  catchError, of,
  mergeMap,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import Message from './message';

const messages = document.querySelector('.messages');
const ul = messages.querySelector('ul');

function getMessageInfo(req) {
  req.messages.sort((a, b) => new Date(a.received) - new Date(b.received));

  req.messages.forEach((el) => {
    const li = document.createElement('li');
    const firstLi = ul.firstChild;

    li.innerHTML = Message.createMsg(el);
    ul.insertBefore(li, firstLi);
  });
}

function getRequest() {
  return new Observable(() => {
    ajax.getJSON('https://ahj-rxjs-nxsn.onrender.com/messages/unread/')
      .pipe(
        catchError(() => of({ messages: [] })),
      )
      .subscribe({
        next: (value) => getMessageInfo(value),
      });
  });
}

const stream$ = interval(5000)
  .pipe(
    mergeMap(() => getRequest()),
  );

stream$.subscribe({
  next: (value) => getMessageInfo(value),
});
