export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('shop-shop', 1);
        let db, tx, store;

        request.onupgradeneeded = function (e) {
            db = e.target.result;
            
            if (!db.objectStoreNames.contains('SubscriptionBox')) {
                console.log("Creating SubscriptionBox store");
                db.createObjectStore('SubscriptionBox', { keyPath: '_id' });
            }
        
            if (!db.objectStoreNames.contains('cart')) {
                console.log("Creating cart store");
                db.createObjectStore('cart', { keyPath: '_id' });
            }
        
            if (!db.objectStoreNames.contains('boxes')) {
                console.log("Creating boxes store");
                db.createObjectStore('boxes', { keyPath: '_id' });
            }
        };
        
        request.onerror = function (e) {
            console.error('IndexedDB error:', e);
            reject('There was an error opening the database');
        };

        request.onsuccess = function (e) {
            db = e.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                console.error(`Store ${storeName} not found`);
                reject('Store not found');
                return;
            }
            tx = db.transaction(storeName, 'readwrite');
            store = tx.objectStore(storeName);

            db.onerror = function (e) {
                console.error('Database error:', e);
            };

            switch (method) {
                case 'put':
                    if (!object._id) {
                        console.error("Missing `_id` in object", object);
                        reject("Missing `_id` in object");
                    } else {
                    const putRequest = store.put(object);
                    putRequest.onsuccess = function () {
                        resolve(object);
                    };
                    }
                    break;
                case 'get':
                    const getRequest = store.getAll();
                    getRequest.onsuccess = function () {
                        resolve(getRequest.result);
                    };
                    getRequest.onerror = function (e) {
                        reject('Error getting data: ' + e.target.error);
                    };
                    break;
                case 'delete':
                    const deleteRequest = store.delete(object._id);
                    deleteRequest.onsuccess = function () {
                        resolve(object._id); // Resolve with the ID of the deleted object
                    };
                    deleteRequest.onerror = function (e) {
                        reject('Error deleting data: ' + e.target.error);
                    };
                    break;
            
            }

            tx.oncomplete = function () {
                db.close();
            };
        };
    });
}
