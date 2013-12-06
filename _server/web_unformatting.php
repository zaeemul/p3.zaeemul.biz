<?php
    // ----- remove HTML TAGs ----- 
	$string = $_POST['str'];			//get the text

	//function to format text
	function removeFormatting($text)
	{
		//remove tags
		$text = preg_replace ('/<[^>]*>/', '', $text);
		//remove footnotes/refrences
		$text = preg_replace ('#\[\d+\]#', '', $text);
		//remove multiple empty lines/tabs/
		$text = preg_replace ('/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/', "", $text);

		// ----- remove control characters ----- 
		//$string = str_replace("\n", ' ', $string);    // --- replace with empty space
		$text = str_replace("\t", ' ', $text);   // --- replace with space
		$text = str_replace("\t", ' ', $text);   // --- replace with space
		// ----- remove multiple spaces -----     
		$text = trim(preg_replace('/ {2,}/', ' ', $text));
		//remove slashes
		$text = str_replace("\\", '', $text);   // --- replace with space
		return $text;
	}
	echo removeFormatting($string);

?>