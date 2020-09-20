import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	constructor(
	) { }

	private storageSub = new Subject<String>();

	watchStorage(): Observable<any> {
		// Digunakan pada komponen utk menghandle change

		// constructor(private storageService: StorageService  ){}
		// ngOnInit() {
		// 		this.storageService.watchStorage().subscribe((data:string) => {
		// 			this will call whenever your localStorage data changes
		// 			use localStorage code here and set your data here for ngFor
		// 		})
		// }

		return this.storageSub.asObservable();
	}

	setItem(key: string, data: any) {
		// Hanya yang melalui function ini yang bisa dideteksi change ny, gunakan utk change value

		localStorage.setItem(btoa(key), btoa(data));
		this.storageSub.next('changed');
	}

	getItem(key: string): string {
		return atob(localStorage.getItem(btoa(key)));
	}

	removeItem(key: string) {
		// Hanya yang melalui function ini yang bisa dideteksi change ny, gunakan utk remove

		if (localStorage.getItem(btoa(key))) {
			localStorage.removeItem(btoa(key));
			this.storageSub.next('removed');
		}
	}

	clear() {
		// Hanya yang melalui function ini yang bisa dideteksi change ny, gunakan utk remove

		localStorage.clear();
		this.storageSub.next('removed');
	}

}
