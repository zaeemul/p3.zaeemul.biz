<?php
	$string = $_POST['str'];			

	function removeFormatting($text)
	{
		
		$text = preg_replace ('/<[^>]*>/', '', $text);
		$text = preg_replace ('#\[\d+\]#', '', $text);
		$text = preg_replace ('/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/', "", $text);

		$text = str_replace("\t", ' ', $text);   
		$text = str_replace("\t", ' ', $text);   
	}
	echo removeFormatting($string);

?>