/*
Exercise: Implement a Simplified Event Emitter

Create a function called `createEventEmitter` that returns an object with methods to register event listeners, emit events, and manage subscriptions. In this simplified version, each event name can only have one listener. The event emitter should have the following features:

1. on(eventName, listener): Register a listener for a specific event. If an event already has a listener, it should be replaced.
2. off(eventName): Remove the listener for a specific event.
3. once(eventName, listener): Register a one-time listener for an event.
4. emit(eventName, ...args): Trigger an event, calling the registered listener with the provided arguments.
5. listenerCount(): Return the total number of registered events.
6. eventNames(): Return an array of all registered event names.

Additional requirements:
- Each event name should have at most one listener.
- The 'once' listeners should be automatically removed after being called.
- If a listener throws an error, it should be caught and logged, but shouldn't crash the program.

The usage of the simplified event emitter should look like this:

const emitter = createEventEmitter();

function listener1(arg) {
    console.log('listener1:', arg);
}

function listener2(arg) {
    console.log('listener2:', arg);
}

emitter.on('event1', listener1);
emitter.on('event2', listener2);
emitter.once('event3', (arg) => console.log('once listener:', arg));

console.log(emitter.listenerCount()); // Should print 3
console.log(emitter.eventNames()); // Should print ['event1', 'event2', 'event3']

emitter.emit('event1', 'Hello');
emitter.emit('event2', 'World');
emitter.emit('event3', 'Once');
emitter.emit('event3', 'This should not be printed');

emitter.off('event1');
console.log(emitter.listenerCount()); // Should print 1 (event2 remains, event3 was removed after once)

emitter.on('event1', (arg) => console.log('new listener:', arg));
emitter.emit('event1', 'New listener');

Implement the `createEventEmitter` function to make this work.
*/

const createEventEmitter = () => {
    const event = new Map();

    return {
        on: (eventName, listener) => {
            event.set(eventName, {
                listener,
                isOnce: false,
            })
            return this;
        },
        off: (eventName) => {
            if(!event.has(eventName)) throw new Error("Event not existed")
            event.delete(eventName)
            return this
        },
        once: (eventName, listener) => {
            if(event.has(eventName)) {
                console.log("replaced")
            }
            event.set(eventName, {
                listener,
                isOnce: true,
            })
            return this; // enable chaining method so this function can called by other function on the same object
        },
        emit: (eventName,...args) => {
            if(event.has(eventName)){
                try {
                    event.get(eventName).listener(...args);
                    if(event.get(eventName).isOnce){
                        event.delete(eventName)
                    }
                } catch(err){
                    console.error(`Error in listener for ${eventName}: ${err}`)
                }
            }
        },
        listenerCount: () => {
            return event.size
        },
        eventNames: () => {
            return [...event.keys()]

        }

    }
}

const listener1 = (...args) => {
    console.log("Listener1: ", ...args)
}

const listener2 = (...args) => {
    console.log("Listener2: ", ...args)
}

const listener3 = (...args) => {
    console.log("Listener3: ",...args.join(""))
}
const emitter = createEventEmitter();

emitter.on("event1", listener1);
emitter.once("event2", listener2);
emitter.on("event3", listener3)

emitter.emit("event1", "hello","waw");
emitter.emit("event2", "test")
emitter.emit("event3", "waw", "wiw")
emitter.off("event3")
console.log(emitter.eventNames())
console.log(emitter.listenerCount())