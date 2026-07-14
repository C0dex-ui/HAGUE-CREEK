$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open("C:\Users\ADMIN\Documents\WEBSITE_DEVELOPMENT\Hague Creek\resources\The original plan was to build the land broker.docx")
Write-Output $doc.Content.Text
$doc.Close()
$word.Quit()
