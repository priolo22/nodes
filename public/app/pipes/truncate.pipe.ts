import {Pipe} from "@angular/core"

@Pipe({
	name: "truncate"
})
export class TruncatePipe {

	transform(value: string, args: string[]|number ): any {
		if ( value == null ) return "";
		let length = 20;
		let suffix = "...";
		if ( args!=null && !Array.isArray(args) ) {
			length = args;
		} else {
			if ( args[0] ) length = parseInt(args[0]);
			if ( args[1] ) suffix = args[1];
		}
		if (value.length <= length) {
			return value;
		}
		return value.substring(0, length) + suffix;
	}

}
