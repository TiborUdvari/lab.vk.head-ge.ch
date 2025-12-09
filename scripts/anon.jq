# Replace letters/numbers with "x"
def anon_text:
  gsub("[\\p{L}\\p{N}\\p{P}]"; "x");

# Apply only to .messages[].content
. as $root
| if has("messages") then
    $root
    | .messages |= map(
        if has("content") then
          .content = ( .content | anon_text )
        else .
        end
      )
  else .
  end
